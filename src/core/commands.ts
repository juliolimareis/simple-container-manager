export const docker = {
  listContainersRunning: 'echo -e "{password}" | sudo -S docker container ps --format "{{.ID}}   {{.Image}}   {{.RunningFor}}   {{.Size}}   {{.Status}}   {{.Ports}}   {{.Names}}" --filter status=running',
  listContainersStop: 'echo -e "{password}" | sudo -S docker container ps --format "{{.ID}}   {{.Image}}   {{.RunningFor}}   {{.Size}}   {{.Status}}   {{.Ports}}   {{.Names}}" --filter status=exited',
  restartContainer: "echo -e \"{password}\" | sudo -S docker restart ls -a",
  startContainer: "echo -e \"{password}\" | sudo -S docker container start {id}",
  stopContainer: "echo -e \"{password}\" | sudo -S docker container stop {id}",
  removeContainer: "echo -e \"{password}\" | sudo -S docker container rm {id}",
  pruneContainer: "echo -e \"{password}\" | sudo -S docker container prune -y",
  pruneNetwork: "echo -e \"{password}\" | sudo -S docker network prune -y",
  logs: "echo -e \"{password}\" | sudo -S docker logs --tail 1000 {id}",
  tailLogs: "sudo docker logs --tail 1000 -f {id}",
}
