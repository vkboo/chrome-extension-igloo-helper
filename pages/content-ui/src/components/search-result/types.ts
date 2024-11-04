export type Props = {
  className?: string;
  platforms: Platform[];
};

export type Platform = {
  key: string;
  logoUrl: string;
  name: string;
  country: Country;
  kind: string;
};
