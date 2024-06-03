import dbConnect from "@/lib/mongodb";
import Location from "@/models/location";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const locations = await Location.find({});

    return NextResponse.json(locations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const data = await req.json();
    const location = new Location(data);
    await location.save();

    return NextResponse.json(location);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const data = await req.json();
    const location = await Location.findByIdAndDelete(data.id);

    return NextResponse.json(location);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
