"use client";
import {
  initializeImageMagick,
  ImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";
import { BounceLoader } from "react-spinners";
import { useEffect, useMemo, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG"];
export type Formats = "Png" | "Webp" | "Tiff";
export const formats: Formats[] = ["Png", "Webp", "Tiff"];
export default function Converter({ format }: { format: Formats }) {
  const [target, setTarget] = useState<Formats>(format);
  const [converting, setConverting] = useState<boolean>(false);
  const [convertedFile, setConvertedFile] = useState<Blob>();
  const [convertedFileName, setConvertedFileName] = useState<string>("");
  const [file, setFile] = useState<File>();
  const handleChange = (file: File) => {
    setFile(file);
    setConverting(true);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        const binaryString = window.atob(
          result?.toString().split(",")[1] || ""
        );
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        ImageMagick.read(bytes, (image) => {
          image.write((data) => {
            let blob = new Blob([data], {
              type: `image/${target.toLowerCase()}`,
            });
            setConverting(false);
            setConvertedFile(blob);
            setConvertedFileName(
              file.name.replace("jpeg", target.toLowerCase())
            );
          }, MagickFormat[target]);
        });
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const reset = () => {
    setFile(undefined);
    setConvertedFile(undefined);
    setConverting(false);
  };

  const processingState = useMemo(() => {
    if (converting) {
      return "Converting";
    } else if (convertedFile) {
      return "Converted";
    } else {
      return "Waiting";
    }
  }, [converting, convertedFile]);

  useEffect(() => {
    initializeImageMagick();
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <div className="flex gap-2 align-middle m-4 items-center">
            <h1 className="text-5xl font-bold">Convert JPEG to</h1>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1 btn-xl w-[80px]">
                {target}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {formats.map((format) => (
                  <li
                    key={format}
                    onClick={() => setTarget(format)}
                    className="uppercase"
                  >
                    <a>{format}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {processingState === "Converted" && (
            <div className="btn-group">
              <a
                className="btn btn-primary"
                type="download"
                download={convertedFileName}
                href={URL.createObjectURL(convertedFile!)}
              >
                Download Image
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={reset}
              >
                Convert another
              </button>
            </div>
          )}
          {processingState === "Converting" && (
            <div className="flex justify-center flex-col gap-4">
              <div className="flex justify-center">
                <BounceLoader color="#36d7b7" />
              </div>
              <p className="text-xl font-bold">
                Converting to {target.toUpperCase()}
              </p>
            </div>
          )}
          {processingState === "Waiting" && (
            <FileUploader
              maxSize={100}
              minSize={0.01}
              handleChange={handleChange}
              name="file"
              dropMessageStyle={{ backgroundColor: "rgba(135,206,250, 0.3)" }}
              types={fileTypes}
            />
          )}
        </div>
      </div>
    </div>
  );
}
