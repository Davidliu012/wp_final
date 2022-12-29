import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useAccount } from "../hooks/useAccount";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DataTable from "../../components/DataTable";
import ResetDataModal from "../ResetDataModal";

import "../../css/AccountMainPage.css";

const AccountMainPage = () => {
  const { accountData, incomeData, expenseData } = useAccount();
  const [value, setValue] = useState("income");
  const [reset, setReset] = useState(false);

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div>
      {/* <div className="WeekCalendar">
        <h2>Week Calendar</h2>
        <WeekCalendar showDetailsHandle={showDetailsHandle} />
        <br />
        <div>{date}</div>
        <br />
        {showDateDetail ? <DateDetail currentDate={date} /> : null}
      </div>
      <br></br> */}
      <DataTable data={accountData} />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReset(true)}
        >
          Reset account data
        </Button>
        <ResetDataModal
          open={reset}
          handleModalClose={() => setReset(false)}
          data={accountData}
        />
      </div>
      <br />
      <br />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="show income-expense tabs"
            >
              <Tab label="income" value="income" />
              <Tab label="expense" value="expense" />
            </TabList>
          </Box>
          <TabPanel value="income">
            {incomeData.length !== 0 ? (
              <DataTable data={incomeData} />
            ) : (
              <div>No income data...</div>
            )}
          </TabPanel>
          <TabPanel value="expense">
            {expenseData.length !== 0 ? (
              <DataTable data={expenseData} />
            ) : (
              <div>No expense data...</div>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
export default AccountMainPage;
