import { theme } from "antd";

export const antDesignCustomTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#4682B4",
    borderRadius: 10,
    colorBgContainer: "#F8F8FF",
  },
  components: {
    Table: {
      borderColor: "#DCDCDC",
    },
    Modal: {
      contentBg: "#F8F8FF",
      headerBg: "#F8F8FF",
    },
    Divider: {
      colorSplit: "#DCDCDC",
    },
    Card: {
      colorBorderSecondary: "#DCDCDC",
    },
  },
};