import { useState } from "react";
// @ts-ignore
import IconLink from "../assets/icons/link.svg?react";
// @ts-ignore
import IconCheck from "../assets/icons/check.svg?react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label="copy url button"
      title={copied ? "copied" : "copy url"}
      className="flex"
    >
      <IconCheck
        className={`${copied ? "size-6 opacity-100" : "size-0 opacity-0"} animation stroke-foreground animation stroke-2`}
      />
      <IconLink
        className={`${copied ? "size-0 opacity-0" : "size-6 opacity-100"} animation stroke-foreground animation stroke-1 hover:stroke-2`}
      />
    </button>
  );
}
