const ROLE = require('~/models/User/User')
canViewProject((user, project) => {
    return (
        user.role === ROLE.ADMIN ||
        project.userId === user.id
    )
})

scopedProject((user, projects) => {
    if (user.role === ROLE.ADMIN) return projects
    return projects.filter(project => project.userId === user.id)
})

export default (canViewProject)