"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Logo } from "@/components/icons";

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

  const TALPALFeaturelist = [
    {
      status: "accounted",
      feature: "Tutor Availability",
    },
    {
      status: "accounted",
      feature: "Tutor Clashes",
    },
    {
      status: "accounted",
      feature:
        "Tutor/Lab assist experience (Only those with teaching experience in a given course can Tutor that course)",
    },
    {
      status: "accounted",
      feature: "Online/In-person preference",
    },
    {
      status: "accounted",
      feature:
        "Tutor Capacity (Max number of tutorials and lab assists a tutor can take)",
    },
    {
      status: "accounted",
      feature:
        "Lab Assist Capacity (Max number of lab assists a lab assist can take)",
    },
    {
      status: "unaccounted",
      feature: "Tutor experience pairings",
    },
  ];

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
    <Tabs aria-label="Options" size="lg">
      <Tab
        key="documentation"
        title={
          <div className="flex items-center space-x-2">
            <Icon
              icon="material-symbols:info-outline"
              className="text-yellow-600"
            />
            <span>Instructions</span>
          </div>
        }
      >
        <Card className="">
          <CardHeader className="flex gap-3">
            <Logo></Logo>
            <div className="flex flex-col">
              <p className="text-md">TALPAL</p>
              <p className="text-small text-default-500">
                Your friendly Tutor Allocator Pal
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="mx-8">
              <h5 className="text-xl font-medium">Is TALPAL for you?</h5>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                TALPAL provides a tute/lab allocation from Talloc tutor
                availability, and your course timetable.
              </p>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                TALPAL takes into account:
              </p>
              <ul role="list" className="space-y-5 my-7">
                {TALPALFeaturelist.map((feature) => (
                  <li key={feature.feature} className="flex items-center">
                    <Icon
                      icon="material-symbols:check-circle"
                      className={
                        feature.status === "accounted"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }
                    />
                    <span
                      className={
                        "text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"
                      }
                    >
                      <p
                        className={
                          feature.status === "unaccounted" ? "line-through" : ""
                        }
                      >
                        {feature.feature}
                      </p>
                    </span>
                  </li>
                ))}
              </ul>

              <Divider></Divider>
              <h5 className="text-xl font-medium my-4">
                Instructions and tips
              </h5>
              <p className=" font-normal text-gray-500 dark:text-gray-400">
                1. Upload your timetable and tutor preferences.
              </p>
              <p className=" font-normal text-gray-500 dark:text-gray-400">
                2. Ensure the CSV files are correctly formatted. Pay close
                attention to the format and the headers. The fields are designed
                to be copied from TALLOC.
              </p>
              <p className=" font-normal text-gray-500 dark:text-gray-400">
                3. There may be no possible solution due to constraints. In this
                case, the allocation will provide a best-efforts solution which
                you can use to manually allocate changes.
              </p>
              <p className=" font-normal text-gray-500 dark:text-gray-400">
                4. Conversly, there may be multiple possible solutions. In this
                case, the allocation will provide one of the possible solutions.
              </p>
            </div>
          </CardBody>
          <Divider />
        </Card>
      </Tab>
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
              heading="Upload your timetable CSV file"
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
              heading="Upload your tutor preferences CSV file"
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
              icon="material-symbols-light:rocket-launch-outline-rounded"
            />
            <span>Allocation</span>
          </div>
        }
      >
        <div className="">
          <CSVViewer
            csvData={allocationState}
            onLoadedCSV={handleAllocationStateChange}
          />
        </div>
        <div className="flex w-full">
          <div className="flex-grow"></div>
          <Button
            color="primary"
            className="mt-4"
            startContent={
              <Icon icon="material-symbols-light:rocket-launch-outline-rounded"></Icon>
            }
            onClick={allocateClick}
          >
            Allocate
          </Button>
        </div>
      </Tab>
    </Tabs>
  );
};
