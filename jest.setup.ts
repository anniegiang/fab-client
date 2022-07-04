import "@testing-library/jest-dom/extend-expect";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  route: "",
  pathname: "",
  query: "",
  asPath: ""
}));
