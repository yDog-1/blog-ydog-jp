import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { Blog } from "./Blog";

export type Content = MicroCMSDate &
	Blog &
	MicroCMSContentId & {
		localPublishedAt: string;
	};
