import * as React from 'react';
import { StyleSheet, View, Dimensions, Image, Animated } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function ImageCarousel({ item }: any) {
  const imageW = width * 1;
  const imageH = imageW * 0.9;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, width)

  return (
    <>
      <Animated.FlatList
        data={item?.images}
        keyExtractor={(index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        pagingEnabled
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          return <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: item }}
              style={{ width: imageW, height: imageH, resizeMode: 'cover' }}
            ></Image>
          </View>
        }}
      />
      <View style={styles.dotView}>
        {item?.images.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={i}
              style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, marginHorizontal: 4, borderRadius: 5 }}
            />
          )
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
