{{each $data.projects}}
<div class="row">
    <div class="span12 currentProject">
        <div class="row projectMenu">
            <div class="span1 closeCell"> 
                <icon class="icon-remove"> </icon> 
                <a data-project-id="${$value.id}"> Close </a>
            </div>
            <div class="span7 forProjectName">
                ${$value.name}
            </div>
            <div class="span4 projectAction">
                <button class="btn"> <icon class="icon-resize-vertical"></icon></button>
                <button class="btn"> <icon class="icon-edit"></icon> Edit </button>
                <button class="btn"> <icon class="icon-remove-sign"></icon> Remove </button>
            </div>
        </div>

        <div class="row">
            <div class="span12 taskMenu">
                <form>
                    <div class="span5 taskName">
                        <input type="hidden" value="${$value.id}" name="id"/>
                        <input type="text" class="input inputName" name="name" placeholder="Add task name"/>
                    </div>
                    <div class="span3">
                        <input  type="text" class="input inputDate" placeholder="Date" name="deadlineDate"/>
                    </div>
                    <div class="span3 taskAdd">
                        <input type="submit" class="btn btn-primary" value="Add task"/>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="span12 forTasks${$value.id}" data-taks-id="${$value.id}">
            </div>
        </div>
    </div>
</div>
{{/each}}