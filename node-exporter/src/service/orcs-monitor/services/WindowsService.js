import taskkill from "taskkill";
import find from "find-process";
export default class WindowsMonitorService {
  constructor(banList, intervalTimeInMiliSeconds) {
    this.banList = banList;
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    this.routine();
  }
  async pskill(processName) {
    find("name", processName, true).then(function (list) {
      list.forEach(async (process) => {
        try {
          await taskkill([process.pid]);
          // console.log("Killed : " + process.name);
        } catch (e) {}
      });
    });
  }
  routine() {
    const killProcesses = () => {
      this.banList.forEach((process) => {
        this.pskill(process);
      });
    };
    this.currentRoutine = setInterval(killProcesses, this.routineIntervalTime);
  }
  updateBanList(banList) {
    this.banList = banList;
  }
  updateRoutineIntervalTime(intervalTimeInMiliSeconds) {
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    clearInterval(this.currentRoutine);
    this.routine();
  }
}
