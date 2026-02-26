"use client";

import { useEffect, useRef } from "react";

export interface AutofillAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Minimal type declarations for the Google Places API surface we use
declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: {
              types?: string[];
              componentRestrictions?: { country: string | string[] };
              fields?: string[];
            }
          ) => {
            addListener: (event: string, handler: () => void) => void;
            getPlace: () => {
              address_components?: Array<{
                long_name: string;
                short_name: string;
                types: string[];
              }>;
            };
          };
        };
      };
    };
  }
}

function parseComponents(
  components: Array<{ long_name: string; short_name: string; types: string[] }>
): AutofillAddress {
  const long = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name ?? "";
  const short = (type: string) =>
    components.find((c) => c.types.includes(type))?.short_name ?? "";

  return {
    streetAddress: `${long("street_number")} ${long("route")}`.trim(),
    city:
      long("locality") ||
      long("sublocality_level_1") ||
      long("neighborhood") ||
      long("postal_town"),
    state: short("administrative_area_level_1"),
    zipCode: long("postal_code"),
    country: short("country"),
  };
}

/**
 * Attaches a Google Places Autocomplete to a street-address input.
 * Returns a ref to attach to the <Input> element.
 *
 * Requires the Maps JS API (with `libraries=places`) to be loaded on the page.
 * The hook waits for the "google-maps-loaded" custom event if the API isn't
 * ready yet when the component mounts.
 */
export function useAddressAutocomplete(
  onSelect: (address: AutofillAddress) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Keep a stable ref to the callback so the effect doesn't re-run on rerenders
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const init = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
          fields: ["address_components"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;
        onSelectRef.current(parseComponents(place.address_components));
      });
    };

    if (window.google?.maps?.places) {
      init();
    } else {
      window.addEventListener("google-maps-loaded", init);
      return () => window.removeEventListener("google-maps-loaded", init);
    }
  }, []); // intentionally runs once — callback is stable via ref

  return inputRef;
}
