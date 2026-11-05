from pathlib import Path

import pymupdf
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CERTIFICATES = ROOT / "public" / "certificates"
OUTPUT = CERTIFICATES / "previews"

FILES = {
    "cisco-ccna.pdf": "cisco-ccna.webp",
    "mastercard-cybersecurity-simulation.pdf": "mastercard-cybersecurity-simulation.webp",
    "ethical-hacker-preparatory-course.pdf": "ethical-hacker-preparatory-course.webp",
    "linux-essential-preparatory-course.pdf": "linux-essential-preparatory-course.webp",
    "computer-hardware-basics.pdf": "computer-hardware-basics.webp",
    "introduction-to-cybersecurity.pdf": "introduction-to-cybersecurity.webp",
    "linux-unhatched.pdf": "linux-unhatched.webp",
}


def render(source_name: str, output_name: str) -> None:
    document = pymupdf.open(CERTIFICATES / source_name)
    page = document[0]
    scale = 1800 / page.rect.width
    pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
    image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
    image.save(OUTPUT / output_name, "WEBP", quality=84, method=6)
    document.close()


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source, destination in FILES.items():
        render(source, destination)

    aws_badge = Image.open(CERTIFICATES / "aws-cloud-essentials-badge.png")
    aws_badge.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    aws_badge.save(
        OUTPUT / "aws-cloud-essentials-badge.webp",
        "WEBP",
        quality=88,
        method=6,
    )
