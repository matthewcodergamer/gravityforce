#!/usr/bin/env python3
"""Validate and zip the Gravity Force Chrome extension."""

from __future__ import annotations

import json
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXT = ROOT / "extension"
REQUIRED = (
    "manifest.json",
    "popup.html",
    "popup.js",
    "popup.css",
    "background.js",
    "content.js",
    "content.css",
    "icons/icon16.png",
    "icons/icon32.png",
    "icons/icon48.png",
    "icons/icon128.png",
)


def fail(message: str) -> None:
    print(f"pack-extension: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_manifest() -> dict:
    path = EXT / "manifest.json"
    if not path.is_file():
        fail("extension/manifest.json missing")
    try:
        manifest = json.loads(path.read_text())
    except json.JSONDecodeError as error:
        fail(f"manifest.json is not valid JSON: {error}")
    if manifest.get("manifest_version") != 3:
        fail("manifest_version must be 3")
    if manifest.get("name") != "Gravity Force":
        fail("extension name must be Gravity Force")
    if not manifest.get("version"):
        fail("manifest version missing")
    if manifest.get("action", {}).get("default_popup") != "popup.html":
        fail("default_popup must be popup.html")
    for name in REQUIRED:
        if not (EXT / name).is_file():
            fail(f"missing {name}")
    return manifest


def write_zip(destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        destination.unlink()
    prefix = "gravity-force-extension"
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(EXT.rglob("*")):
            if not path.is_file():
                continue
            if path.name.startswith("."):
                continue
            archive.write(path, f"{prefix}/{path.relative_to(EXT).as_posix()}")


def copy_public(zip_path: Path) -> None:
    public_dir = ROOT / "public"
    if not public_dir.is_dir():
        return
    shutil.copyfile(zip_path, public_dir / zip_path.name)


def write_version(manifest: dict, zip_path: Path) -> None:
    payload = {
        "name": manifest["name"],
        "version": manifest["version"],
        "file": zip_path.name,
        "bytes": zip_path.stat().st_size,
    }
    version_path = zip_path.with_name("version.json")
    version_path.write_text(json.dumps(payload, indent=2) + "\n")


def main() -> None:
    manifest = load_manifest()
    zip_path = ROOT / "dist" / "gravity-force-extension.zip"
    write_zip(zip_path)
    copy_public(zip_path)
    write_version(manifest, zip_path)
    print(f"packed {manifest['name']} {manifest['version']} -> {zip_path}")
    print(f"bytes {zip_path.stat().st_size}")


if __name__ == "__main__":
    main()
