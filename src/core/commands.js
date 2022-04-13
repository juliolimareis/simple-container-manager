export default {
	listContainers: "echo -e \"{password}\n\" | sudo -S docker container ls -a",
	stopContainer: "echo -e \"{password}\n\" | sudo -S docker container stop {id}",
	startContainer: "echo -e \"{password}\n\" | sudo -S docker container start {id}",
	removeContainer: "echo -e \"{password}\n\" | sudo -S docker container rm {id}",
	pruneContainer: "echo -e \"{password}\n\" | sudo -S docker container prune -y",
	pruneNetwork: "echo -e \"{password}\n\" | sudo -S docker network prune -y",
}