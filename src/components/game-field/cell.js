const Cell = ({value, hundleClick, ind}) => {
    return (
        <div className="cell" onClick={() => hundleClick(ind)}>
            {value}
        </div>
    )
}

export default Cell