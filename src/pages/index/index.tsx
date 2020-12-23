import React, { Component } from "react";
import cn from "classnames";
import { View, Text } from "@tarojs/components";
import NoviceGuide from "./NoviceGuide";
import "./index.scss";

export default function Index() {
  const [value, setValue] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  return (
    <View className="index">
      <View className={cn("absolute", "top")} id="top">
        top
      </View>
      <View className={cn("absolute", "leftTop")} id="lt">
        LT
      </View>
      <View className={cn("absolute", "leftBottom")} id="lb">
        LB
      </View>
      <View className={cn("absolute", "rightTop")} id="rt">
        RT
      </View>
      <View className={cn("absolute", "rightBottom")} id="rb">
        RB
      </View>
      <View className={cn("absolute", "bottom")} id="bt">
        bottom
      </View>
      <NoviceGuide
        option={[
          { id: "top", content: <View>这是 top </View>, placement: "top" },
          { id: "lt", content: <View>这是 lt </View>, placement: "leftTop" },
          { id: "lb", content: <View>这是 lb </View>, placement: "leftBottom" },
          { id: "rt", content: <View>这是 rt </View>, placement: "rightTop" },
        ]}
        visible={visible}
        onVisibleChange={(v) => setVisible(v)}
        value={value}
        onChange={(v) => setValue(v)}
      />
    </View>
  );
}
