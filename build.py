#!/usr/bin/env python3
"""Build the standalone static DEMO using Python's standard library only."""
from pathlib import Path
import hashlib
import json
import shutil

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
PUBLIC_FILES = ("index.html", "robots.txt", "sitemap.xml", "site.webmanifest", ".nojekyll")

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def build():
    checkpoint = json.loads((ROOT / "SOURCE-CHECKPOINT.json").read_text())
    head = (ROOT / "index.html").read_text().split("<body", 1)[0]
    if "interior-studio-v2.dilsan881.chatgpt.site" in head:
        raise ValueError("Source head still points to the private preview")
    expected = checkpoint["planned_pages_url"]
    if 'rel="canonical" href="' + expected + '"' not in head:
        raise ValueError("Canonical does not match SOURCE-CHECKPOINT planned_pages_url")
    source_files = [ROOT / name for name in PUBLIC_FILES]
    source_files += sorted(p for p in (ROOT / "assets").rglob("*") if p.is_file() and p.name != "provenance.json")
    if any(p.is_symlink() for p in (ROOT / "assets").rglob("*")):
        raise ValueError("Symlinks are not allowed in public assets")
    for p in source_files:
        if p.is_symlink() or not p.is_file():
            raise ValueError("Missing/unsafe source: " + str(p.relative_to(ROOT)))
    if DIST.is_symlink():
        raise ValueError("dist must be a local directory")
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    records = []
    for p in source_files:
        relative = p.relative_to(ROOT)
        target = DIST / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(p, target)
        if sha256(p) != sha256(target):
            raise ValueError("Copy mismatch: " + str(relative))
        records.append({"path": relative.as_posix(), "bytes": target.stat().st_size, "sha256": sha256(target)})
    manifest = {"schema_version": 1, "package": checkpoint["package"], "planned_pages_url": expected,
                "deployment_verified_by_build": False, "public_files": len(records), "files": records}
    (ROOT / "BUILD-INVENTORY.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(checkpoint["package"] + ": " + str(len(records)) + " public files; static copy verified; deployment not checked")

if __name__ == "__main__":
    build()
