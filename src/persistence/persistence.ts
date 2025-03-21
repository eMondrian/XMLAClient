import container from "@/config/inversify";
import LocalRepositoryImpl from "./LocalRepository/LocalRepositoryImpl";

container.bind<LocalRepositoryImpl>('localRepositories').toConstructor(LocalRepositoryImpl);