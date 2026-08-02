
class SidebarControls {
    // class to help in the sidebar creation process
    constructor(listElement, primaryTargets, secondaryTargets, isDynammic) {
        this.listElement = listElement;
        this.primaryTargets = primaryTargets;
        this.secondaryTargets = secondaryTargets;
        this.isDynammic = isDynammic
    }

    updateListStatic() {
        // function for updating a static list
        const primaries = [...document.querySelectorAll(this.primaryTargets)];
        const secondaries = [...document.querySelectorAll(this.secondaryTargets)];
        for (var primary of primaries) {
            let listElementPrimary = document.createElement("li");
            let primaryLink = document.createElement("a");
            primaryLink.textContent = primary.textContent;
            primaryLink.href = "#" + primary.id;
            primaryLink.classList.add("neutral-link");
            listElementPrimary.appendChild(primaryLink);
            this.listElement.appendChild(listElementPrimary);
            for (var secondary of secondaries) {
                let listElementSecondary = document.createElement("li");
                let secondaryLink = document.createElement("a");
                secondaryLink.textContent = secondary.textContent;
                secondaryLink.href = "#" + secondary.id;
                secondaryLink.classList.add("neutral-link");
                listElementSecondary.appendChild(secondaryLink);
                listElementSecondary.classList.add("secondary-list-item");
                this.listElement.appendChild(listElementSecondary);
            }
        }
    }
}





// MAIN BLOCK: THIS CODE WILL ACTUALLY RUN

if (document.body.classList.contains("advanced-javascript-body")) {
    const leftSidebar = document.querySelector("#category-list");
    const leftSidebarControls = new SidebarControls(leftSidebar, ".course-category", ".course-subcategory", true);
    leftSidebarControls.updateListStatic();

}