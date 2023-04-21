import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "./TabPanel";
import { a11yProps } from "../../../../hooks/propsTabPanel";
import { Datos } from "../DatosComponent/Datos";

export const BasicTabs = ({ children, titulo = [] }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FFF",
        padding: "20px",
        borderRadius: 3,
        boxShadow: "rgba(100, 100, 111, 0.67) 0px 7px 29px 0px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {children.map((child, i) => (
            <Tab label={titulo[i]} key={i} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {children.map((child, i) => (
        <TabPanel value={value} index={i} key={i}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
};
