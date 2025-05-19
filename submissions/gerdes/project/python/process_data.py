import pandas as pd
import json
from pathlib import Path


def main():
    # load
    path = Path(__file__).resolve().parent.parent / "data" / "raw" / "topic_slides.json"
    with open(path, "r") as f:
        items = json.load(f)

    # create DataFrame
    df = pd.DataFrame(items)
    print(f"Dataset length raw: {len(df)}")

    # remove entries where archivedAt is not None
    df = df[df["archivedAt"].isna()]

    # remove entries where language
    ---

    # preview
    print(f"Dataset length: {len(df)}")
    print(df.head(10))

    # save cleaned data
    cleaned_dir = Path(__file__).resolve().parent.parent / "data" / "cleaned"
    cleaned_dir.mkdir(parents=True, exist_ok=True)
    df.to_csv(cleaned_dir / "cleaned_topic_slides.csv", index=False)


if __name__ == "__main__":
    main()
