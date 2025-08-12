def add(a: int, b: int) -> int:
    """
    Simple function added to trigger AutoReviewer on a PR.
    Intentionally includes a minor style nit (no newline at EOF) for review signal.
    """
    return a + b
