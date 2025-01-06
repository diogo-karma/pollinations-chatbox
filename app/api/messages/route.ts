import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.dir(formData);
  const message = formData.get("message") as string;
  const type = formData.get("type") as string;
  const model = JSON.parse(formData.get("model") as string);
  const image = formData.get("image") as string;

  let content = ``;
  let imageUrl = null;
  let visionDescription = null;
  const seed = Math.floor(Math.random() * 1337);

  
  if (image) {
    // const visionPayload = {
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "text", text: message },
    //         {
    //           type: "image_url",
    //           image_url: {
    //             url: image,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };

    // const visionResponse = await fetch(process.env.AZURE_API_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "api-key": process.env.AZURE_API_KEY,
    //   },
    //   body: JSON.stringify(visionPayload),
    // });

    // console.log(
    //   process.env.AZURE_API_URL,
    //   process.env.AZURE_API_KEY,
    //   JSON.stringify(visionPayload)
    // );
    // const visionData = await visionResponse.json();
    // console.log(visionData);
    // visionDescription =
    //   visionData?.choices[0]?.message?.content || "No description available.";

    // if (type === "text") {
    //   const influencedPrompt = `${message} influenced by ${visionDescription}`;
    //   const prompt = encodeURIComponent(influencedPrompt);
    //   content = await fetch(
    //     `https://text.pollinations.ai/${prompt}?seed=${seed}&model=${model.name}`
    //   )
    //     .then((res) => res.text())
    //     .catch((err) => `Error fetching text: ${err.message}`);
    // } else if (type === "image") {
    //   const combinedPrompt = `${message} ${visionDescription}`;
    //   const prompt = encodeURIComponent(combinedPrompt);
    //   imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&seed=${seed}&model=${model.name}`;
    // }
  } else if (type === "text") {
    const prompt = encodeURIComponent(message);
    content = await fetch(
      `https://text.pollinations.ai/${prompt}?seed=${seed}&model=${model.name}`
    )
      .then((res) => res.text())
      .catch((err) => `Error fetching text: ${err.message}`);
  } else if (type === "image") {
    const prompt = encodeURIComponent(message);
    imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&seed=${seed}&model=${model.name}&nologo=true`;
  } else {
    return NextResponse.json(
      { error: "Invalid type. Use 'image' or 'text'." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    type,
    model,
    seed,
    imageUrl,
    content,
    visionDescription,
  });
}
