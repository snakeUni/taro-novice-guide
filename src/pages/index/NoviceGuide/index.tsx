import * as React from "react";
import cn from "classnames";
import {
  usePageScroll,
  createSelectorQuery,
  pxTransform,
  NodesRef,
} from "@tarojs/taro";
import { View } from "@tarojs/components";
import { NoviceGuideProps } from "./interface";
import styles from "./index.module.scss";

const { useRef, useEffect, useState } = React;

export default function NoviceGuide({
  option = [],
  onChange,
  onVisibleChange,
  value = 0, // 默认是第一个
  visible = false,
  maskStyle,
  offsetX = 0,
  offsetY = 80,
}: NoviceGuideProps) {
  const boxRef = useRef<NodesRef.BoundingClientRectCallbackResult>();
  const containerRef = useRef<NodesRef.BoundingClientRectCallbackResult>();
  const [boxStyle, setBoxStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});
  const scrollTop = useRef(0);
  const current = option[value];

  const getBoundingClientRect = (id: string) => {
    return createSelectorQuery().select(`#${id}`).boundingClientRect();
  };

  const getContainerStyle = () => {
    if (boxRef.current && containerRef.current) {
      // 上左
      if (current.placement === "top") {
        const { left, width } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.top - offsetY),
          left: pxTransform(
            left + width / 2 - containerRef.current.width / 2 + offsetX
          ),
        };
      }

      if (current.placement === "bottom") {
        const { left, width } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.bottom + offsetY),
          left: pxTransform(
            left + width / 2 - containerRef.current.width / 2 + offsetX
          ),
        };
      }

      if (current.placement === "leftTop") {
        const { right } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.top - offsetY),
          left: pxTransform(right - containerRef.current.width + offsetX),
        };
      }

      if (current.placement === "leftBottom") {
        const { right } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.bottom + offsetY),
          left: pxTransform(right - containerRef.current.width + offsetX),
        };
      }

      if (current.placement === "rightTop") {
        const { right } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.top - offsetY),
          left: pxTransform(right + offsetX),
        };
      }

      if (current.placement === "rightBottom") {
        const { right } = boxRef.current;
        return {
          top: pxTransform(scrollTop.current + boxRef.current.bottom + offsetY),
          left: pxTransform(right + offsetX),
        };
      }
    }

    return {};
  };

  useEffect(() => {
    if (visible && current) {
      setTimeout(() => {
        // 获取目标的尺寸信息
        getBoundingClientRect(current.id).exec((res) => {
          const rect = res[0];

          if (rect) {
            setBoxStyle({
              left: pxTransform(rect.left),
              top: pxTransform(rect.top + scrollTop.current),
              width: pxTransform(rect.width),
              height: pxTransform(rect.height),
            });
            boxRef.current = rect;
          }
        });

        getBoundingClientRect("mask-container").exec((res) => {
          const rect = res[0];

          if (rect) {
            containerRef.current = rect;
            const containerStyle = getContainerStyle();
            setContainerStyle(containerStyle);
          }
        });
      }, 0);
    }
  }, [visible, value]);

  usePageScroll((rect) => {
    scrollTop.current = rect.scrollTop;
  });

  const handleClick = () => {
    if (current) {
      current.onClick?.(current, value);

      // 最后一个
      if (value === option.length - 1) {
        onVisibleChange?.(false);
      } else {
        onChange?.(value + 1);
      }
    }
  };

  if (current && visible) {
    return (
      <View className={styles.noviceGuide}>
        <View className={styles.mask} style={maskStyle} />
        <View
          className={styles.container}
          id="mask-container"
          style={containerStyle}
        >
          {current.content && (
            <View className={styles.content}>{current.content}</View>
          )}
          {current.arrow && (
            <View
              className={cn(styles.arrow, styles[`arrow-${current.placement}`])}
            >
              {current.arrow}
            </View>
          )}
        </View>
        <View
          className={styles.box}
          onClick={handleClick}
          style={{ ...current.boxStyle, ...boxStyle }}
        />
      </View>
    );
  }
}
