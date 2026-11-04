export interface PaginationLinkDto {
  url: string | null;
  label: string;
  page?: number | null;
  active: boolean;
}

export interface PaginationMetaDto {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLinkDto[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMetaDto;
}
