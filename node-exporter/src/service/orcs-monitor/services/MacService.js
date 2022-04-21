import taskkill from "taskkill";
import find from "find-process";
import ps from "ps-node";
export default class MacMonitorService {
  constructor(banList, intervalTimeInMiliSeconds) {
    this.banList = banList;
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    this.routine();
  }
  async pskill(processName) {
    find("name", processName, true).then(function (list) {
      list.forEach(async (process) => {
        ps.kill(process.pid), function( err ) {
          if (err) {
              throw new Error( err );
          }
          else {
              console.log( 'Process %s has been killed!', pid );
          }
      }
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
