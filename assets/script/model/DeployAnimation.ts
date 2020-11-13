import { DeployAnimationType } from "./DeployAnimationType";

export class DeployAnimation {
    public type: DeployAnimationType = DeployAnimationType.Frame;
    public resources: Array<string> = null;
    public name: string;

}