"use client";

import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";

export default function TypedText() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];
  const sequence = roles.flatMap((role) => [role, 2000]);

  return (
    <p className="mt-2 text-xl font-medium text-primary">
      <TypeAnimation
        key={roles.join("|")}
        sequence={sequence}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        style={{ display: "inline-block" }}
      />
    </p>
  );
}
