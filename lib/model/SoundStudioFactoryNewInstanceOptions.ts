import { ConfigService } from "@/services/interfaces/ConfigService";

export default interface SoundStudioFactoryNewInstanceOptions {
    configService?: ConfigService;
    buffersToFetch?: string[]
}
