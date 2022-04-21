import find from "find-process";
import ps from "ps-node";
import notifier from 'node-notifier';
export default class LinuxMonitorService {
  constructor(banList, intervalTimeInMiliSeconds) {
    this.banList = banList;
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    this.routine();
  }
  async pskill(processName) {
    find("name", processName.toLowerCase(), true).then(function (list) {
      list.forEach(async (process) => {
        notifier.notify({
          title: 'Warning !',
          message: process.name + ' is a restricted program please do not use! Program will be terminated'
        });
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
