"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { TimetableUpload } from "./timetable";

import {
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Icon } from "@iconify/react";

export const Solver = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Tabs aria-label="Options" variant="light" size="lg">
      <Tab
        key="timetable"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="ion:ban" color="error" className="text-red-500" />
            <span>Timetable</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            <TimetableUpload />
          </CardBody>
        </Card>
      </Tab>
      <Tab
        key="preferences"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="ion:ban" color="error" className="text-red-500" />
            <span>Tutor preferences</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            <TimetableUpload />
          </CardBody>
        </Card>
      </Tab>
      <Tab
        key="allocation"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="ion:ban" color="error" className="text-red-500" />
            <span>Allocation</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            <TimetableUpload />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
};
