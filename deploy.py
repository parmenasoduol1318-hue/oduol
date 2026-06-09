import argparse
import http.server
import os
import socketserver
import sys
import webbrowser
from pathlib import Path


def resource_path(relative_path: str) -> Path:
    """Get the absolute path to a resource, whether running normally or bundled."""
    if getattr(sys, "frozen", False):
        base_path = Path(sys._MEIPASS)
    else:
        base_path = Path(__file__).resolve().parent
    return base_path / relative_path


def find_build_dir() -> Path:
    build_dir = resource_path("build")
    if not build_dir.exists() or not build_dir.is_dir():
        raise FileNotFoundError(
            "Build directory not found. Run `npm run build` in the project root before serving or packaging."
        )
    return build_dir


class QuietRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args) -> None:
        pass


def serve(build_dir: Path, port: int) -> None:
    handler_class = lambda *args, directory=str(build_dir): QuietRequestHandler(*args, directory=directory)
    with socketserver.ThreadingTCPServer(("", port), handler_class) as httpd:
        url = f"http://127.0.0.1:{port}"
        print(f"Serving built app from {build_dir} at {url}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Serve the exported web build for PyInstaller deployment.")
    parser.add_argument("command", nargs="?", choices=["run", "serve"], default="run",
                        help="run: serve and open browser; serve: only serve files")
    parser.add_argument("--port", type=int, default=8000, help="Port to serve the web build on")
    parser.add_argument("--no-open", action="store_true", help="Do not open the browser automatically")
    args = parser.parse_args()

    try:
        build_dir = find_build_dir()
    except FileNotFoundError as error:
        print(error)
        return 1

    if args.command == "run" and not args.no_open:
        webbrowser.open(f"http://127.0.0.1:{args.port}")

    serve(build_dir, args.port)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
