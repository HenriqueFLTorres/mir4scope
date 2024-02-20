import { NextResponse } from "next/server";

const BASE_URL = "https://webapi.mir4global.com/nft/lists";

const allowedFilters = [
  "listType",
  "class",
  "levMin",
  "levMax",
  "priceMin",
  "priceMax",
  "page",
  "powerMin",
  "powerMax",
  "sort",
];

const listTypeFilters = ["topTraded", "recommended", "recent", "sale"];

const sortFilters = [
  "latest",
  "oldest",
  "pricehigh",
  "pricelow",
  "lvhigh",
  "pshigh",
];

export async function POST(request: Request) {
  const filters = (await request.json()) as {
    [key in string]: string | number;
  };

  const ONLY_ALLOWED_FILTERS = Object.keys(filters).some((filter) =>
    allowedFilters.includes(filter),
  );

  if (!ONLY_ALLOWED_FILTERS)
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Unknown filters were given." },
    );

  const ALLOWED_LIST_TYPE = listTypeFilters.some(
    (filter) => filter === filters?.["listType"],
  );

  if (!ALLOWED_LIST_TYPE)
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Unknown list type filter." },
    );

  const ALLOWED_SORT = sortFilters.some(
    (filter) => filter === filters?.["sort"],
  );

  if (!ALLOWED_SORT)
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Unknown sort filter." },
    );

  try {
    let params = "?languageCode=en";

    for (let [filter, value] of Object.entries(filters)) {
      params += `&${filter}=${value}`;
    }

    const response = await fetch(`${BASE_URL}${params}`);
    const { code, data } = await response.json();

    return NextResponse.json({
      success: true,
      data,
    }, { status: code });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500, statusText: "Server error." },
    );
  }
}
