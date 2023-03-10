module.exports = {
    embedColor: "#2d46a3",
    admins: [
        "190574611082117120"
    ],
    serverId: "1015036562276364409",
    adminRoleId: "702594243277095124",
    supportServer: (code) => `https://discord.gg/extorious`,
    inviteURL: (id, permissions) => `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${permissions ? permissions : 2147568640}&scope=bot`
}
