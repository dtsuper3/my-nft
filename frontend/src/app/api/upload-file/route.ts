import { NextResponse, NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {
        const authorization = { Authorization: `Bearer ${process.env.PINATA_JWT}`, }
        const data = await request.formData();
        if (data.has("json")) {
            const body = data.get("json") as any;
            const options = {
                method: 'POST',
                headers: { ...authorization, 'Content-Type': 'application/json' },
                body: body
            };

            const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
            const resData = await res.json();
            console.log("pinJSONToIPFS resData:- ", resData)
            return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}` }, { status: 200 });
        }
        const file: File | null = data.get("file") as unknown as File;
        data.append("file", file);
        data.append("pinataMetadata", JSON.stringify({ name: file.name }));
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                ...authorization,
            },
            body: data,
        });
        const resData = await res.json();
        console.log("pinFileToIPFS:- ", resData);

        return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}` }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}