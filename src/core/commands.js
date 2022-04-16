export const docker = {
  listContainers: "echo -e \"{password}\" | sudo -S docker container ls -a",
  startContainer: "echo -e \"{password}\" | sudo -S docker container start {id}",
  stopContainer: "echo -e \"{password}\" | sudo -S docker container stop {id}",
  removeContainer: "echo -e \"{password}\" | sudo -S docker container rm {id}",
  pruneContainer: "echo -e \"{password}\" | sudo -S docker container prune -y",
  pruneNetwork: "echo -e \"{password}\" | sudo -S docker network prune -y",
  logs: "echo -e \"{password}\" | sudo -S docker logs --tail 1000 -f {id}",
}

export const listTest = [
	{
		id: "cb7c0a41e8d7",
		name: "doker-hdt",
		status: "Exited",
	},
	{
		id: "1f304125615b",
		name: "doker-psi-2",
		status: "Exited",
	},
]

export const listTest2 = [
	{
		id: "cb7c0a41e8d7",
		name: "doker-hdt",
		status: "up",
		isRunning: false,
	},
	{
		id: "1f304125615b",
		name: "doker-psi-2",
		status: "Exited",
		isRunning: true,
	},
]