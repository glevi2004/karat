import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function PUT(req: Request) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        // Business info
        structure: body.structure ?? undefined,
        legalName: body.legalName ?? undefined,
        hasDBA: body.hasDBA ?? undefined,
        ein: body.ein ?? undefined,
        vertical: body.vertical ?? undefined,
        incorporationDate: body.incorporationDate ?? undefined,
        incorporationState: body.incorporationState ?? undefined,
        hasOtherOwners: body.hasOtherOwners ?? undefined,
        revenue: body.revenue ?? undefined,
        employees: body.employees ?? undefined,
        // Personal info
        isOwner: body.isOwner ?? undefined,
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        dob: body.dob ?? undefined,
        hasSSN: body.hasSSN ?? undefined,
        streetAddress: body.streetAddress ?? undefined,
        aptSuite: body.aptSuite ?? undefined,
        city: body.city ?? undefined,
        state: body.state ?? undefined,
        zipCode: body.zipCode ?? undefined,
        country: body.country ?? undefined,
        // Officer
        officerName: body.officerName ?? undefined,
        officerTitle: body.officerTitle ?? undefined,
        // Business address
        businessStreetAddress: body.businessStreetAddress ?? undefined,
        businessAptSuite: body.businessAptSuite ?? undefined,
        businessCity: body.businessCity ?? undefined,
        businessState: body.businessState ?? undefined,
        businessZipCode: body.businessZipCode ?? undefined,
        businessCountry: body.businessCountry ?? undefined,
        // Platform
        socialPlatform: body.socialPlatform ?? undefined,
        // Status
        onboardingCompleted: body.onboardingCompleted ?? undefined,
      },
      omit: { password: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Onboarding update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
