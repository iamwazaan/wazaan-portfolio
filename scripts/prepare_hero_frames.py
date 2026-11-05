from pathlib import Path
import sys

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "hero-frames"
FRAME_LIMIT = 60
FRAME_WIDTH = 720


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/prepare_hero_frames.py <frames-directory>")

    source = Path(sys.argv[1]).expanduser().resolve()
    frames = sorted(source.glob("ezgif-frame-*.jpg"))
    if not frames:
        raise SystemExit(f"No ezgif JPG frames found in {source}")

    count = min(FRAME_LIMIT, len(frames))
    indexes = [round(index * (len(frames) - 1) / (count - 1)) for index in range(count)]
    OUTPUT.mkdir(parents=True, exist_ok=True)

    for output_index, source_index in enumerate(indexes, start=1):
        with Image.open(frames[source_index]) as image:
            image = image.convert("RGB")
            height = round(image.height * FRAME_WIDTH / image.width)
            image = image.resize((FRAME_WIDTH, height), Image.Resampling.LANCZOS)
            image.save(
                OUTPUT / f"frame-{output_index:03d}.webp",
                "WEBP",
                quality=76,
                method=6,
            )


if __name__ == "__main__":
    main()
