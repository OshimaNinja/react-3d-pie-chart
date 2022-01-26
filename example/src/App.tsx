import BubbleRadar, { MainType, RiskType } from "d3-bubble-radar";
import React, { useEffect, useState } from "react";
import { fakeData } from "./Data";

function App() {
  const data: MainType[] = fakeData
    .filter((item: MainType) => item.type && item.subCategory)
    .map((item: MainType) => {
      const index: number = RiskType[item.type].indexOf(item.subCategory) + 1;
      item.subCategoryIndex = index;
      return item;
    });

  const [realdata, setData] = React.useState<MainType[]>([]);
  const [asset, setAsset] = useState(false);

  useEffect(() => {
    const allowedData = asset ? ["Licensing", "Loss of IT asset"] : ['Logical Access', "Licensing", "Loss of IT asset"];
    const data: MainType[] = fakeData
      .filter(
        (item: MainType) =>
          item.type &&
          item.subCategory &&
          allowedData.includes(item.subCategory)
      )
      .map((item: MainType) => {
        const index: number = RiskType[item.type].indexOf(item.subCategory) + 1;
        item.subCategoryIndex = index;
        return item;
      });

    setData(data);
  }, [asset]);

  console.log(realdata);

  return (
    <div className="App">
      <BubbleRadar data={realdata} />
      <label>Asset</label>
      <input
        type="checkbox"
        name="Asset"
        id="asset"
        checked={asset}
        onChange={(e) => setAsset(e.target.checked)}
      />
    </div>
  );
}

export default App;
