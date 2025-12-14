export interface EntityData {
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;

  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;

  v_x?: number;
  v_y?: number;
  v_scale?: number;
  v_scaleX?: number;
  v_scaleY?: number;
  v_sdx?: number;
  v_sdy?: number;

  width?: number;
  height?: number;
  color?: string;
  alpha?: number;

  texture?: string;

  type: string;
  name: string;

  active?: boolean;
  debug?: number;
  deepPosition?: boolean;
  noCheckSize?: boolean;

  entities?: EntityData[];
}
