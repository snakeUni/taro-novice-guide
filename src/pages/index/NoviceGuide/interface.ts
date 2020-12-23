export interface NoviceGuideProps {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 变化的回调
   */
  onVisibleChange?: (v: boolean) => void;
  /**
   * 当前显示的引导
   */
  value?: number;
  /**
   * 引导变化的回调
   */
  onChange?: (value: number) => void;
  /**
   * 引导的数据源
   */
  option?: Option[];
  // maskStyle
  maskStyle?: React.CSSProperties;
  /**
   * offsetY 竖直方向的偏移量
   */
  offsetY?: number;
  /**
   * offsetX 水平方向的偏移量
   */
  offsetX?: number;
}

export interface Option {
  /**
   * 引导元素的 id
   */
  id: string;
  /**
   * 引导的内容
   */
  content?: React.ReactNode;
  /**
   * 引导的方向
   */
  placement?: Placement;
  /**
   * 点击引导元素的回调
   */
  onClick?: (cur: Option, index: number) => void;
  /**
   * style 样式
   */
  style?: React.CSSProperties;
  /**
   * arrow 箭头
   */
  arrow?: React.ReactNode;
  /**
   * boxStyle 选中区域的样式
   */
  boxStyle?: React.CSSProperties;
}

export type Placement =
  | "top"
  | "bottom"
  | "rightTop"
  | "rightBottom"
  | "leftTop"
  | "leftBottom";
