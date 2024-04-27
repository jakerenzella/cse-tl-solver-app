"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import {
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Icon } from "@iconify/react";
import { CSVUploader } from "./csv-uploader";
import { CSVViewer } from "./csv-viewer";

export const Solver = () => {
  const [timetableState, setTimetableState] = useState({
    cols: [],
    rows: [],
    rawCSV: [],
  });
  const [preferencesState, setPreferencesState] = useState({
    cols: [],
    rows: [],
    rawCSV: [],
  });

  const [allocationState, setAllocationState] = useState({
    cols: [],
    rows: [],
    rawCSV: [],
  });

  const handleTimetableStateChange = (newState: any) => {
    setTimetableState(newState);
  };
  const handlePreferencesStateChange = (newState: any) => {
    setPreferencesState(newState);
  };
  const handleAllocationStateChange = (newState: any) => {
    setAllocationState(newState);
  };

  const allocateClick = async () => {
    // check do we have timetable
    if (timetableState.cols.length === 0) {
      console.log("No timetable data");
      return;
    }

    // check do we have preferences
    if (preferencesState.cols.length === 0) {
      console.log("No preferences data");
      return;
    }

    const response = await fetch("/api/allocate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timetable: timetableState.rawCSV,
        preferences: preferencesState.rawCSV,
      }),
    });
    const data = await response.json();

    setAllocationState({ rawCSV: data, cols: [], rows: [] });
  };

  return (
    <Tabs aria-label="Options" size="lg" disabledKeys={["music"]}>
      <Tab
        key="timetable"
        title={
          <div className="flex items-center space-x-2">
            {timetableState.cols.length > 0 && (
              <Icon
                icon="ion:checkmark"
                color="success"
                className="text-green-500"
              />
            )}
            {timetableState.cols.length === 0 && (
              <Icon icon="ion:ban" color="error" className="text-red-500" />
            )}
            <span>Timetable</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            <CSVUploader
              csvData={timetableState}
              onLoadedCSV={handleTimetableStateChange}
            />
          </CardBody>
        </Card>
      </Tab>
      <Tab
        key="preferences"
        title={
          <div className="flex items-center space-x-2">
            {preferencesState.cols.length > 0 && (
              <Icon
                icon="ion:checkmark"
                color="success"
                className="text-green-500"
              />
            )}
            {preferencesState.cols.length === 0 && (
              <Icon icon="ion:ban" color="error" className="text-red-500" />
            )}
            <span>Tutor preferences</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            <CSVUploader
              csvData={preferencesState}
              onLoadedCSV={handlePreferencesStateChange}
            />
          </CardBody>
        </Card>
      </Tab>

      <Tab
        isDisabled={
          timetableState.cols.length === 0 || preferencesState.cols.length === 0
        }
        key="allocation"
        title={
          <div className="flex items-center space-x-2">
            <Icon
              className={
                timetableState.cols.length !== 0 ||
                preferencesState.cols.length !== 0
                  ? "animate-pulse"
                  : ""
              }
              animate-bounce
              icon="material-symbols-light:rocket-launch-outline-rounded"
            />
            <span>Allocation</span>
          </div>
        }
      >
        <Button
          color="primary"
          startContent={
            <Icon icon="material-symbols-light:rocket-launch-outline-rounded"></Icon>
          }
          onClick={allocateClick}
        >
          Allocate
        </Button>
        <div className="mt-4">
          <CSVViewer
            csvData={allocationState}
            onLoadedCSV={handleAllocationStateChange}
          />
        </div>
      </Tab>
    </Tabs>
  );
};
