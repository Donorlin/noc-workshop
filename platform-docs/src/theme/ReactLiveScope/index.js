// Everything a ```tsx live example can use without importing it: React and its hooks, every export of
// @noc/platform, the lucide-react icons below and `z` from zod.
import * as platform from "@noc/platform";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Code,
  Link2,
  MessagesSquare,
  Mic,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import React from "react";
import { z } from "zod";

const ReactLiveScope = {
  React,
  ...React,
  ...platform,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Code,
  Link2,
  MessagesSquare,
  Mic,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  z,
};

export default ReactLiveScope;
