import type { SVGProps } from "react"

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-label="Search Icon"
    fill="none"
    height="1em"
    role="img"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12.3226 13.3833C11.3996 14.0841 10.2484 14.5 9 14.5C5.96243 14.5 3.5 12.0376 3.5 9C3.5 5.96243 5.96243 3.5 9 3.5C12.0376 3.5 14.5 5.96243 14.5 9C14.5 10.2484 14.0841 11.3996 13.3833 12.3226L16.2803 15.2197C16.5732 15.5126 16.5732 15.9874 16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803L12.3226 13.3833ZM13 9C13 11.2091 11.2091 13 9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9Z"
      fill="#FFFFFF"
      fillRule="evenodd"
    />
  </svg>
)

export { Search }
