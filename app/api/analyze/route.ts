import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Görsel sağlanmadı" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Sen bir tamir ve arıza analiz uzmanısın. Yüklenen görseldeki arızayı tespit et ve şemaya uygun Türkçe yanıt dön.`,
            },
            {
              inlineData: {
                mimeType: image.type,
                data: base64,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            analysisText: { type: "STRING" },
            difficulty: {
              type: "STRING",
              description: "Başlangıç | Orta | İleri",
            },
            estTime: { type: "STRING" },
            warningText: { type: "STRING" },
            steps: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  id: { type: "INTEGER" },
                  title: { type: "STRING" },
                  description: { type: "STRING" },
                },
                required: ["id", "title", "description"],
              },
            },
            materials: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  id: { type: "STRING" },
                  name: { type: "STRING" },
                  checked: { type: "BOOLEAN" },
                },
                required: ["id", "name", "checked"],
              },
            },
          },
          required: [
            "analysisText",
            "difficulty",
            "estTime",
            "warningText",
            "steps",
            "materials",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json(
        { error: "Yapay zeka yanıt üretemedi" },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Sistemde bir hata oluştu" },
      { status: 500 },
    );
  }
}
