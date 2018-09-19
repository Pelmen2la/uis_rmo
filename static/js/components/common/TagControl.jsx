import React from 'react';
import Icon from './../common/icons/Icon.jsx';

class TagControl extends React.Component {
    constructor(props) {
        super(props);

        this.tagsContainerRef = React.createRef();
        this.textInputRef = React.createRef();

        var availableTagList = ['Акция', 'Обработан', 'Обратный звонок', 'Продажа', 'Важный вопрос', 'Важная сделка',
            'Первичное обращение', 'Пердзаказ'];
        this.state = {
            text: '',
            tags: [],
            availableTagList: availableTagList,
            filteredAvailableTagList: [],
            selectedTagIndex: null
        };
    }

    render() {
        var state = this.state;
        return (
            <div className="tag-control-wrapper">
                <div className="tags-container" ref={this.tagsContainerRef}>
                    {this.getTagsHtml(state.tags)}
                    <input type="text"
                           placeholder="Введите тег"
                           ref={this.textInputRef}
                           value={state.text}
                           onChange={this.onInputChange.bind(this)}
                           onKeyPress={this.onInputKeyPress.bind(this)}
                           onKeyDown={this.onInputKeyDown.bind(this)}
                    />
                </div>
                {this.getDropdownTagList()}
            </div>
        );
    }

    getTagsHtml(tags) {
        return tags.map(function(tag, i) {
            return <div key={i} className="tag-container">
                {tag.name}
                <Icon iconPath="common/small_cross.png" onImageClick={() => this.onRemoveTagBtnClick(i)}/>
            </div>
        }.bind(this));
    }

    getDropdownTagList() {
        var tagList = this.state.filteredAvailableTagList;
        if(tagList.length === 0) {
            return;
        }
        var regExp = new RegExp('^' + this.state.text, 'gi'),
            selectedItemIndex = this.state.selectedTagIndex,
            items = tagList.map((t, i) => {
                let itemText = t.replace(regExp, '<b>' + t.match(regExp)[0] + '</b>'),
                    className = i === selectedItemIndex ? 'selected' : '';
                return <li key={i} className={className} dangerouslySetInnerHTML={{__html: itemText}}>
                </li>
            });
        return <ul className="dropdown-tag-list">
            {items}
        </ul>
    }

    onInputChange(e) {
        var val = e.target.value,
            tagList = this.state.availableTagList;
        this.setState({
            text: val,
            filteredAvailableTagList: val ? tagList.filter((t) => t.toLowerCase().indexOf(val.toLowerCase()) === 0) : []
        });
    }

    onInputKeyDown(e) {
        var tagList = this.state.filteredAvailableTagList,
            key = e.key;
        if(tagList.length > 0 && ['ArrowDown', 'ArrowUp'].indexOf(key) > -1) {
            e.preventDefault();
            e.stopPropagation();

            var selectedTagIndex = this.state.selectedTagIndex,
                lastTagIndex = tagList.length - 1,
                isDown = key.indexOf('Down') > 0;
            if(selectedTagIndex == null) {
                selectedTagIndex = -1;
            }

            selectedTagIndex += isDown ? 1 : -1;
            if(selectedTagIndex < 0) {
                selectedTagIndex = lastTagIndex;
            } else if(selectedTagIndex > lastTagIndex) {
                selectedTagIndex = 0;
            }
            this.setState({ selectedTagIndex: selectedTagIndex });
        }
    }

    onInputKeyPress(e) {
        var state = this.state,
            text = state.text;
        if(text && e.key === 'Enter') {
            if(state.selectedTagIndex != null && state.filteredAvailableTagList.length) {
                text = state.filteredAvailableTagList[state.selectedTagIndex];
            }
            var tags = state.tags;
            tags.push({name: text});
            this.setState({
                text: '',
                selectedTagIndex: null,
                filteredAvailableTagList: [],
                tags: tags
            });
        }
    }

    onRemoveTagBtnClick(tagIndex) {
        var tags = this.state.tags;
        tags.splice(tagIndex, 1);
        this.setState({ tags: tags });
        this.textInputRef.current.focus();
    }

    componentDidMount() {
        window.setTimeout(this.ensureInputWidth.bind(this), 0);
    }

    componentDidUpdate() {
        this.ensureInputWidth()
    }

    ensureInputWidth() {
        var tagsText = this.state.tags.map((t) => t.name).join('');
        if(tagsText !== this.state.lastCalculatedTagsText) {
            this.calculateInputWidth();
            this.setState({ lastCalculatedTagsText: tagsText });
        }
    }

    calculateInputWidth() {
        var tagsCnt = this.tagsContainerRef.current,
            children = tagsCnt.childNodes,
            lastRowItemsWidth = 0,
            rightMargin = 0,
            rowTopPosition = 0;
        for(var child, i = children.length - 2; child = children[i]; i--) {
            if(!rightMargin) {
                rightMargin = parseInt(getComputedStyle(child).marginRight);
            }
            var boundRect = child.getBoundingClientRect();
            if(!rowTopPosition) {
                rowTopPosition = boundRect.top;
            } else if(boundRect.top < rowTopPosition) {
                break
            }
            lastRowItemsWidth += Math.ceil(boundRect.width + rightMargin);
        }
        var inputWidth = tagsCnt.offsetWidth - lastRowItemsWidth;
        this.textInputRef.current.style.width = inputWidth > 100 ? inputWidth + 'px' : '100%';
    }
}

export default TagControl;