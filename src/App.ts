// Entrypoint

import { TokenCrudHandler } from "./Core/TokenCrudHandler";
import { PreloaderService } from "./Utils/PreloaderService";

new TokenCrudHandler();
new PreloaderService();
