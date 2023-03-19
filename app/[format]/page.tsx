import Converter, { Formats, formats } from "@/components/Converter";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return ["Png", "Webp", "Tiff"].map((format) => ({
    format: format.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { format: Formats };
}) {
  return {
    title: `Convert JPEG to ${params.format.toUpperCase()}`,
    description: `Effortlessly convert JPEG images to ${params.format.toUpperCase()} with our fast and secure online JPEG converter. We prioritize your privacy - no images are stored on our servers. Try our free JPEG conversion tool today!`,
  };
}

export default function Format({ params }: { params: { format: Formats } }) {
  if (!["png", "webp", "tiff"].includes(params.format.toLowerCase())) {
    notFound();
  }
  const format = (params.format.charAt(0).toUpperCase() +
    params.format.slice(1)) as Formats;
  return (
    <main>
      <Converter format={format} />
    </main>
  );
}
