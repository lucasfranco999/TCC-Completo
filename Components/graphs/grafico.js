import { Text } from "react-native-svg";

function Meu({pieCentroid, mapIndex, data}){
    return(
      <Text 
      key={`label-${mapIndex}`}
      x={pieCentroid[0]-3}
      y={pieCentroid[1]-5}
      fill= "#fff"
      textAnchor={'middle'}
      alignmentBaseline={'middle'}
    >
      R$ {data.value}
    </Text>
    )
}

export default Meu;